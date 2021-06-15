import NumberFormatInput from "react-number-format";

import { MinusCircle, PlusCircle } from "phosphor-react";

import LabeledInput from "components/LabeledInput";

import { ErrorAlert } from "components/CommonLayout/form.layout";

import Button from "components/Button";
import {
    InputsWrapper,
    InputsContainer,
    InputContainer,
    FileInputContainer,
    VariantButtonContainer,
    ProductImageContainer,
} from "./layout.styles";

const VariantForm = ({ CRUDAction, formData, setFormData, product_variant, index, handleNestedChange, submitErrors }) => {
    const addProductVariant = () => {
        let productVariantList = [
            ...formData["product_variant"],
            {
                name: "",
                price: "",
                profitPercent: "",
                unitValue: "",
                imagePath: null,
            },
        ];

        setFormData({
            ...formData,
            product_variant: productVariantList,
        });
    };

    const deleteProductVariant = async (index) => {
        let productVariantList = formData["product_variant"].filter((variant, i) => i !== index);

        if (productVariantList.length !== 0) {
            setFormData({
                ...formData,
                product_variant: productVariantList,
            });
        }
    };

    const printError = (path) => {
        if (submitErrors[path]) {
            return <ErrorAlert> {submitErrors[path]} </ErrorAlert>;
        }
        return "";
    };

    const hasError = (path) => {
        return submitErrors[path];
    };

    return (
        <InputsWrapper>
            <InputsContainer>
                <InputContainer>
                    <LabeledInput
                        onChange={(event) => handleNestedChange("product_variant", index, "name", event.target.value)}
                        placeholder="* Nombre"
                        value={product_variant.name}
                        allowDecimalSeparators
                        capitalize
                        errorborder={hasError(`product_variant[${index}].name`)}
                    />
                    {printError(`product_variant[${index}].name`)}
                </InputContainer>
                <InputContainer>
                    <LabeledInput
                        onValueChange={(values) => handleNestedChange("product_variant", index, "price", values.floatValue)}
                        placeholder="* Precio"
                        value={product_variant.price}
                        allowDecimalSeparators
                        as={NumberFormatInput}
                        errorborder={hasError(`product_variant[${index}].price`)}
                    />
                    {printError(`product_variant[${index}].price`)}
                </InputContainer>
                <InputContainer>
                    <LabeledInput
                        placeholder="* % Ganancia"
                        onValueChange={(values) => handleNestedChange("product_variant", index, "profitPercent", values.floatValue)}
                        value={product_variant.profitPercent}
                        allowDecimalSeparators
                        as={NumberFormatInput}
                        errorborder={hasError(`product_variant[${index}].profitPercent`)}
                    />
                    {printError(`product_variant[${index}].profitPercent`)}
                </InputContainer>
                <InputContainer>
                    <LabeledInput
                        placeholder="* Valor Unidad"
                        onValueChange={(values) => handleNestedChange("product_variant", index, "unitValue", values.floatValue)}
                        value={product_variant.unitValue}
                        allowDecimalSeparators
                        as={NumberFormatInput}
                        errorborder={hasError(`product_variant[${index}].unitValue`)}
                    />
                    {printError(`product_variant[${index}].unitValue`)}
                </InputContainer>
            </InputsContainer>
            <FileInputContainer>
                <LabeledInput
                    file
                    type="file"
                    onChange={(event) => handleNestedChange("product_variant", index, "imagePath", event.target.files[0])}
                    placeholder={product_variant.imagePath ? product_variant.imagePath.name : "Seleccione Imagen"}
                >
                    {product_variant.imagePath && CRUDAction === "edit" && (
                        <ProductImageContainer url={"http://localhost:5000" + product_variant.imagePath} />
                    )}
                    {product_variant.imagePath && CRUDAction === "create" && (
                        <ProductImageContainer url={product_variant.imagePath && URL.createObjectURL(product_variant.imagePath)} />
                    )}
                </LabeledInput>
                {printError(`product_variant[${index}].imagePath`)}
            </FileInputContainer>
            {index !== formData.product_variant.length - 1 && (
                <VariantButtonContainer color="red">
                    <Button onClick={() => deleteProductVariant(index)}>
                        <MinusCircle size={24} />
                    </Button>
                </VariantButtonContainer>
            )}
            {index === formData.product_variant.length - 1 && (
                <VariantButtonContainer color="green">
                    <VariantButtonContainer color="red">
                        <Button onClick={() => deleteProductVariant(index)}>
                            <MinusCircle size={24} />
                        </Button>
                    </VariantButtonContainer>
                    <Button onClick={addProductVariant}>
                        <PlusCircle size={24} />
                    </Button>
                </VariantButtonContainer>
            )}
        </InputsWrapper>
    );
};
export default VariantForm;
