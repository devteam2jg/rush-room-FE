import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useCallback } from 'react';

const useShowToast = () => {
  const toast = useToast();

  const showToast = useCallback(
    (title: string, description: string, status: UseToastOptions['status']) => {
      toast.closeAll();
      toast({
        title,
        description,
        status,
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );
  return showToast;
};

export default useShowToast;
