import { useQuery } from '@tanstack/react-query';

export default function usePostData() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['postData'],
    queryFn: async () => {
      const responce = await fetch('http://192.168.1.22:3000/api/v1/auction/1');
      return await responce.json();
    },
  });
  return { data, error, isLoading };
}
