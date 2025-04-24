'use client';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';

interface LoaderOrErrorProps {
  loading: boolean;
  error: string | null;
  errorMessage?: string; 
}
export const LoaderOrError = ({
  loading,
  error,
  errorMessage = 'Error al cargar los datos.' 
}: LoaderOrErrorProps) => {
  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <ProgressSpinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <Message severity="error" text={`${errorMessage} (${error})`} />
      </div>
    );
  }
  return null;
};
