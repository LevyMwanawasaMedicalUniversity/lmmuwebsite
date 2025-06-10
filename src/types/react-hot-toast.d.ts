declare module 'react-hot-toast' {
  interface Toast {
    (message: string | React.ReactNode, options?: any): string;
    success(message: string | React.ReactNode, options?: any): string;
    error(message: string | React.ReactNode, options?: any): string;
    loading(message: string | React.ReactNode, options?: any): string;
    dismiss(toastId?: string): void;
  }
  
  export const toast: Toast;
  export function Toaster(props?: any): JSX.Element;
  export default toast;
}
