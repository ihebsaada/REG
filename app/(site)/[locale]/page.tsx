import IndexRoute from '@/components/pages/home/HomePageContainer'
import { getDictionary } from '@/lib/i18n'
type Props = {
  params: { locale: 'en' | 'fr' | 'ar' }
}

export default async function Page({ params }: Props) {
  const lang = params.locale ?? 'en'
  const [dict] = await Promise.all([
    getDictionary(lang), // static JSON dict
  ]).then(([dict]) => [dict])

  return <IndexRoute lang={lang} dict={dict} />
}
