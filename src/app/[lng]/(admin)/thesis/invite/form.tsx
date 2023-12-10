import { API } from '@assets/configs';
import { request } from '@assets/helpers';
import { InviteType, StudentType } from '@assets/interface';
import { LanguageType } from '@assets/types/lang';
import { ResponseType } from '@assets/types/request';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from '@resources/components/UI';
import { InputText, InputTextArea } from '@resources/components/form';
import { useTranslation } from '@resources/i18n';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { TFunction } from 'i18next';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

interface InviteFormRefType {
    show?: (data?: StudentType) => void;
    close?: () => void;
}

interface InviteFormType extends LanguageType {
    title: string;
    onSuccess?: (faculty: StudentType) => void;
}

const defaultValues: InviteType = {
    message: '',
    studentJoinId: 0,
};

const schema = (t: TFunction) =>
    yup.object({
        message: yup.string().required(),
        studentJoinId: yup.number(),
    });

const InviteForm = forwardRef<InviteFormRefType, InviteFormType>(({ title, lng, onSuccess }, ref) => {
    const [visible, setVisible] = useState(false);
    const { t } = useTranslation(lng);

    const { control, handleSubmit, reset, getValues } = useForm({
        resolver: yupResolver(schema(t)) as Resolver<InviteType>,
        defaultValues,
    });

    const inviteMutation = useMutation<any, AxiosError<ResponseType>, { message: string; studentJoinId: number }>({
        mutationFn: (data) => {
            return request.post(API.list.invite, data, {
                params: {
                    removeFacultyId: true,
                },
            });
        },
    });

    const show = (data?: StudentType) => {
        setVisible(true);

        if (data) {
            reset({
                message: '',
                studentJoinId: data.studentJoinId,
            });
        }
    };

    const close = () => {
        setVisible(false);
        reset(defaultValues);
    };

    const onSubmit = (data: InviteType) => {
        inviteMutation.mutate(
            {
                message: data.message,
                studentJoinId: getValues('studentJoinId'),
            },
            {
                onSuccess: (response) => {
                    close();
                    onSuccess?.(response.data);
                    toast.success(t('request:update_success'));
                },
            },
        );
    };

    useImperativeHandle(ref, () => ({
        show,
        close,
    }));

    return (
        <Dialog
            header={title}
            visible={visible}
            style={{ width: '60vw' }}
            className='overflow-hidden'
            contentClassName='mb-8'
            onHide={close}
        >
            <Loader show={inviteMutation.isPending} />

            <form className='mt-2 gap-3' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='message'
                    control={control}
                    render={({ field, fieldState }) => (
                        <InputTextArea
                            id='form_data_message'
                            value={field.value}
                            row={true}
                            label='Lời nhắn'
                            placeholder='Lời nhắn'
                            errorMessage={fieldState.error?.message}
                            onChange={field.onChange}
                        />
                    )}
                />

                <div className='flex align-items-center justify-content-end gap-2 absolute bottom-0 left-0 right-0 bg-white p-4'>
                    <Button
                        label={t('cancel')}
                        icon='pi pi-undo'
                        severity='secondary'
                        onClick={(e) => {
                            e.preventDefault();
                            close();
                        }}
                    />
                    <Button label={t('save')} icon='pi pi-save' />
                </div>
            </form>
        </Dialog>
    );
});

InviteForm.displayName = 'Student Form';

export default InviteForm;
export type { InviteFormRefType };
