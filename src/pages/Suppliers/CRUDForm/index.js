import { useEffect } from 'react';

import {
    Form,
    HeaderContainer,
    BodyContainer,
    FooterWrapper,
    FooterContainer,
    InputContainer,
    ButtonContainer,
    CloseButtonContainer,
    TitleContainer,
    ErrorAlert,
    ErrorContainer,
} from 'components/CommonLayout/form.layout';

import LabeledInput from 'components/LabeledInput';
import Button from 'components/Button';
import NumberFormatInput from 'react-number-format';
import { colors } from 'styles/theme';
import { BookBookmark, XCircle, X } from 'phosphor-react';
import { useForm } from 'hooks/useForm';
import { createSupplier, updateSupplier } from 'api/suppliers';
import supplierSchema from 'validations/schemas/supplier';

const SupplierForm = ({ supplier, action, handleClose, onSubmit }) => {
    const { handleChange, handleNumericInput, handleSubmit, formData, setFormData, submitErrors, submitSuccess } = useForm({
        initialState: {
            name: '',
            rif: '',
            address: '',
            phoneNumber: '',
        },
        action,
        createResource: createSupplier,
        editResource: updateSupplier,
        schema: supplierSchema,
    });

    useEffect(() => {
        if (action === 'edit' && supplier) setFormData(supplier);
    }, [supplier, action, setFormData]);

    useEffect(() => {
        if (submitSuccess) {
            if (action === 'create') {
                onSubmit('El proveedor se ha registrado con éxito');
            } else if (action === 'edit') {
                onSubmit('El proveedor se ha actualizado con éxito');
            }
        }
    }, [submitSuccess, action, onSubmit]);

    const printError = (path) => {
        if (submitErrors[path]) {
            return <ErrorAlert>{submitErrors[path]}</ErrorAlert>;
        }
    };

    const hasError = (path) => {
        return submitErrors[path];
    };

    return (
        <Form onSubmit={handleSubmit}>
            <HeaderContainer>
                <CloseButtonContainer>
                    <Button onClick={handleClose}>
                        <X />
                    </Button>
                </CloseButtonContainer>
                <TitleContainer>{action === 'create' ? 'Crear proveedor' : 'Editar proveedor'}</TitleContainer>
            </HeaderContainer>
            <BodyContainer>
                <InputContainer>
                    <LabeledInput
                        onChange={handleChange}
                        placeholder='Nombre'
                        name='name'
                        value={formData.name}
                        autoFocus
                        capitalize
                        required
                        errorborder={hasError('name')}
                    />
                    {printError('name')}
                </InputContainer>
                <InputContainer>
                    <LabeledInput
                        onChange={handleChange}
                        placeholder='RIF'
                        name='rif'
                        value={formData.rif}
                        thousandSeparator='.'
                        decimalSeparator=','
                        decimalScale={0}
                        errorborder={hasError('rif')}
                        capitalize
                        required
                    />
                    {printError('rif')}
                </InputContainer>
                <InputContainer>
                    <LabeledInput
                        onChange={handleChange}
                        placeholder='Dirección'
                        name='address'
                        value={formData.address}
                        errorborder={hasError('address')}
                        required
                    />
                    {printError('address')}
                </InputContainer>
                <InputContainer>
                    <LabeledInput
                        onValueChange={(values) => handleNumericInput(values.value, 'phoneNumber')}
                        placeholder='Teléfono'
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        format='( #### ) - ### - ####'
                        allowEmptyFormatting
                        mask='_'
                        type='tel'
                        as={NumberFormatInput}
                        errorborder={hasError('phoneNumber')}
                        required
                    />
                    {printError('phoneNumber')}
                </InputContainer>
            </BodyContainer>
            <FooterWrapper>
                <ErrorContainer>{printError('undefined')}</ErrorContainer>
                <FooterContainer>
                    <ButtonContainer color={colors.primary}>
                        <Button type='submit'>
                            <BookBookmark size={24} />
                            Enviar
                        </Button>
                    </ButtonContainer>
                    <ButtonContainer color='red'>
                        <Button onClick={handleClose}>
                            <XCircle size={24} />
                            Cancelar
                        </Button>
                    </ButtonContainer>
                </FooterContainer>
            </FooterWrapper>
        </Form>
    );
};
export default SupplierForm;
