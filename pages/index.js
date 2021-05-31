import Head from 'next/head'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')   //Switches Active Category
  const [templates, setTemplates] = useState([])
  const [templatesCount, setTemplatesCount] = useState()
  const [views, setViews] = useState([])
  

  const getViews = () => {
    let a = []
    for (let i = 0; i < 15; i++) {
      a.push(templates[i])
    }
    return a;
  }

  //Search Templates by Name
  const searchItems = (e) => {
    const string = e.target.value.toLowerCase()

    const searchResult = templates.filter(item => item.name.toLowerCase() === string)

    // const searchCategory = templates.map(item => item.category.Health.toLowerCase())
    // console.log(searchCategory)

    if (searchResult.length < 1) {
      setViews(getViews())
    } else {
      setViews(searchResult)
    }
  }


  //
  const filterByCategory = (e) => {
    const string = e.target.value

    setActiveCategory(string)
  }


  useEffect(() => {
    fetch('https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates')
    .then(res => res.json())
    .then(data => {
      setTemplates(data)
      setTemplatesCount(data.length)

      let a = []
      for (let i = 0; i < 15; i++) {
        a.push(data[i])
      }
      setViews(a)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Form Template Search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Search for templates to work with easily" />
        <meta name="keywords" content="form template" />
        <meta name="author" content="Osita Ezeigbo" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>

      <main className={styles.main}>
        <div className={styles.formDiv}>

          <form className={styles.form}>
            <div className={styles.searchDiv}>
              <input className={styles.searchInput} type="text" placeholder="Search Templates" onChange={(e) => searchItems(e)}/>
              <div className={styles.searchIconDiv}>
                <img className={styles.searchIcon} src="/search.png" width="18px" height="18px" />
              </div>
            </div>

            <div className={styles.sortByDiv}>
              <p className={styles.sortby}>Sort By: </p>
              <div className={styles.fieldsetContainer}>
                <fieldset>
                  <legend>Category</legend>
                  <select name="category" onClick={(e) => filterByCategory(e)}>
                    <option value="All">All</option>
                    <option value="Health">Health</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Education">Education</option>
                  </select>
                </fieldset>
            
                <fieldset>
                  <legend>Order</legend>
                  <select name="category">
                    <option value="default">Default</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </fieldset>
            
                <fieldset>
                  <legend>Date</legend>
                  <select name="date">
                    <option value="default">Default</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </fieldset>
              </div>
            </div>
          </form>

        </div>

        <div className={styles.infoSection}>
          <img src="/info.png" alt="info icon" width="18px" height="18px" />
          <p>Tada! Get started with a free template. Can’t find what you are looking for? Search from the 1000+ available templates</p>
        </div>

            {
              templates.length < 1 ? <h3>Loading...</h3> : <div>
              <div className={styles.cardHead}>
                <p>{activeCategory} Templates</p>
                <p>{templatesCount} Templates</p>
              </div>
              <div className={styles.cardContainer}>

                {
                  views.map((item, index) =>  <Card key={index} name={item.name} description={item.description} />)
                }
               
              </div>
            </div>
            }
        
            {
              templates.length < 1 ? <div></div> : <div className={styles.pageNavigate}>
              <p>Previous</p>
              <p><span className={styles.currentPage}>1</span> of 14</p>
              <p>Next &gt;</p>
            </div>
            }
        
      </main>

    </div>
  )
}