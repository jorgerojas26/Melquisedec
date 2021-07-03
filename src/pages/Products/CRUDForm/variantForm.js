import NumberFormatInput from 'react-number-format';

import { MinusCircle, PlusCircle } from 'phosphor-react';

import LabeledInput from 'components/LabeledInput';

import { InputContainer } from 'components/CommonLayout/form.layout';

import Button from 'components/Button';
import { InputsWrapper, InputsContainer, FileInputContainer, VariantButtonContainer, ProductImageContainer } from './layout.styles';

const VariantForm = ({ CRUDAction, formData, setFormData, product_variant, index, handleNestedChange, printError, hasError }) => {
    const addProductVariant = () => {
        let productVariantList = [
            ...formData['product_variant'],
            {
                name: '',
                price: 0,
                profitPercent: 30,
                unitValue: '',
                imagePath: null,
            },
        ];

        setFormData({
            ...formData,
            product_variant: productVariantList,
        });
    };

    const deleteProductVariant = async (index) => {
        let productVariantList = formData['product_variant'].filter((variant, i) => i !== index);

        if (productVariantList.length !== 0) {
            setFormData({
                ...formData,
                product_variant: productVariantList,
            });
        }
    };

    return (
        <InputsWrapper>
            <InputsContainer>
                <InputContainer>
                    <LabeledInput
                        onChange={(event) => handleNestedChange('product_variant', index, 'name', event.target.value)}
                        placeholder='* Nombre'
                        value={product_variant.name}
                        allowDecimalSeparators
                        capitalize
                        errorborder={hasError(`product_variant[${index}].name`)}
                        errormessage={printError(`product_variant[${index}].name`)}
                        active
                    />
                    {printError(`product_variant[${index}].name`)}
                </InputContainer>
                <InputContainer>
                    <LabeledInput
                        onValueChange={(values) => handleNestedChange('product_variant', index, 'price', values.floatValue)}
                        placeholder='* Precio $'
                        value={product_variant.price}
                        defaultValue={product_variant.price}
                        allowDecimalSeparators
                        as={NumberFormatInput}
                        errorborder={hasError(`product_variant[${index}].price`)}
                        active
                    />
                    {printError(`product_variant[${index}].price`)}
                </InputContainer>
                <InputContainer>
                    <LabeledInput
                        placeholder='% Ganancia'
                        //onValueChange={(values) => handleNestedChange('product_variant', index, 'profitPercent', values.floatValue)}
                        value={product_variant.profitPercent}
                        allowDecimalSeparators
                        as={NumberFormatInput}
                        errorborder={hasError(`product_variant[${index}].profitPercent`)}
                        active
                        disabled
                        title='No se puede editar'
                    />
                    {printError(`product_variant[${index}].profitPercent`)}
                </InputContainer>
                <InputContainer>
                    <LabeledInput
                        placeholder='* Valor Unidad'
                        onValueChange={(values) => handleNestedChange('product_variant', index, 'unitValue', values.floatValue)}
                        value={product_variant.unitValue}
                        allowDecimalSeparators
                        as={NumberFormatInput}
                        errorborder={hasError(`product_variant[${index}].unitValue`)}
                        active
                    />
                    {printError(`product_variant[${index}].unitValue`)}
                </InputContainer>
            </InputsContainer>
            <FileInputContainer>
                <LabeledInput
                    file
                    type='file'
                    onChange={(event) => handleNestedChange('product_variant', index, 'imagePath', event.target.files[0])}
                    placeholder={product_variant.imagePath ? product_variant.imagePath.name : 'Seleccione Imagen'}
                >
                    {product_variant.imagePath && CRUDAction === 'edit' && <ProductImageContainer url={product_variant.imagePath} />}
                    {product_variant.imagePath && CRUDAction === 'create' && (
                        <ProductImageContainer url={product_variant.imagePath && URL.createObjectURL(product_variant.imagePath)} />
                    )}
                </LabeledInput>
            </FileInputContainer>
            {printError(`product_variant[${index}].imagePath`)}
            {index !== formData.product_variant.length - 1 && (
                <VariantButtonContainer color='red'>
                    <Button onClick={() => deleteProductVariant(index)}>
                        <MinusCircle size={24} />
                    </Button>
                </VariantButtonContainer>
            )}
            {index === formData.product_variant.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}>
                    <VariantButtonContainer color='red'>
                        <Button onClick={() => deleteProductVariant(index)}>
                            <MinusCircle size={24} />
                        </Button>
                    </VariantButtonContainer>
                    <VariantButtonContainer color='green'>
                        <Button onClick={addProductVariant}>
                            <PlusCircle size={24} />
                        </Button>
                    </VariantButtonContainer>
                </div>
            )}
        </InputsWrapper>
    );
};
export default VariantForm;
