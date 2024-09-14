import { useToast } from "@chakra-ui/react";

export const useShowToast = () => {
  const toast = useToast();

  const showToast = (title, description, status, duration, isClosable) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable,
    });
  };

  return showToast;
};
