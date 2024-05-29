import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

type Props = {
  onUpload: (result: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button {...getRootProps()} size="sm" className="w-full lg:w-auto">
          <Upload className="mr-2 size-4" />
          Importar
        </Button>
      )}
    </CSVReader>
  );
};
