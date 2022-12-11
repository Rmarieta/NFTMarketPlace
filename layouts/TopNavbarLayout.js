import Header from '../components/Header/Header'

const style = {
  main: `dark:bg-[#212226]`,
}

const TopNavbarLayout = ({children}) => {
  return(
    <>
      <Header/>
      <main className={style.main}>{children}</main>
    </>
  )
}

export default TopNavbarLayout