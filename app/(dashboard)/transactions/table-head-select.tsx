import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

const options = ["amount", "payee", "notes", "date"];

const optionTexts: Record<string, string> = {
  amount: "Monto",
  payee: "Beneficiario",
  notes: "Notas",
  date: "Fecha",
};

const optionsWithText = options.map((option) => ({
  value: option,
  text: optionTexts[option],
}));

export const TableHeadSelect = ({
  columnIndex,
  selectedColumns,
  onChange,
}: Props) => {
  const currentSelection = selectedColumns[`column_${columnIndex}`];

  return (
    <Select
      value={currentSelection || ""}
      onValueChange={(value: string) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "border-none bg-transparent capitalize outline-none focus:ring-transparent focus:ring-offset-0",
          currentSelection && "text-blue-500",
        )}
      >
        <SelectValue placeholder="Saltar" />
        <SelectContent>
          <SelectItem value="skip">Saltar</SelectItem>

          {optionsWithText.map((option, index) => {
            const disabled =
              Object.values(selectedColumns).includes(option.value) &&
              selectedColumns[`column_${columnIndex}`] !== option.value;

            return (
              <SelectItem
                key={index}
                value={option.value}
                disabled={disabled}
                className="capitalize"
              >
                {option.text}
              </SelectItem>
            );
          })}
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
};
