export class FormValue {
    private valueName: string;
    private value: string;
    private required: boolean;

    constructor(valueName: string, value: string, required: boolean) {
        this.valueName = valueName;
        this.value = value;
        this.required = required;
     }

    isRequired(): boolean {
        return this.required;
    }

    setIsRequired(required): void {
        this.required = required;
    }

    setValueName(name): void {
        this.valueName = name;
    }

    getValueName(): string {
        return this.valueName;
    }

    setValue(value): void {
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }
}
