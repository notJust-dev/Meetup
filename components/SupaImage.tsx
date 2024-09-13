import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { supabase } from '~/utils/supabase';

type SupaImageProps = {
  path: string;
  className: string;
};

export default function SupaImage({ path, className }: SupaImageProps) {
  const [uri, setUri] = useState('');

  useEffect(() => {
    if (path) {
      downloadImage(path);
    }
  }, [path]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setUri(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message);
      }
    }
  }

  if (!uri) {
    return <View className={`${className} bg-slate-200`} />;
  }

  return <Image source={{ uri }} className={className} />;
}
