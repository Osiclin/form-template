import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Card from '../components/Card'
import styles from '../styles/Home.module.css'

// const categoryChange = require('../search')

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')   //Switches Active Category
  const [templates, setTemplates] = useState([])                //All templates received from the API
  const [templatesCount, setTemplatesCount] = useState()        //Number of templates
  const [search, setSearch] = useState([])
  const [views, setViews] = useState([])
  const [n, setN] = useState(15)
  const [page, setPage] = useState(1)

  let searchbox = useRef(null)
  
  //Gets the templates to display per page
  const getViews = () => {
    let a = []
    for (let i = 0; i < 15; i++) {
      a.push(templates[i])
    }
    return a;
  }

  //Sets views to display
  const showViews = (data) => {
    let result = []
    for (let i = 0; i < 15; i++) {
      result.push(data[i])
    }
    setViews(result)
  }

  //Next page function
  const nextPage = (search, n) => {
    if (page < templates.length) {
    setPage(prevState => prevState + 1)
    setN(prevState => prevState + 15)
    let result = []
    for (let i = n; i < (15 + n); i++) {
      if (activeCategory === 'All') {
        result.push(templates[i])
      } else {
        result.push(search[i])
      }
    }
    setViews(result)
    window.scrollTo(0, 0)
    } else {}
  }

  //Previous page function
  const prevPage = (search, n) => {
    if (page > 1) {
    setPage(prevState => prevState - 1)
    setN(prevState => prevState - 15)
    let result = []
    for (let i = n; i < (15 + n); i++) {
      if (activeCategory === 'All') {
        result.push(templates[i])
      } else {
        result.push(search[i])
      }
    }
    setViews(result)
    window.scrollTo(0, 0)
    }
    else{}
  }

  //CategoryChange(activeCategory, templates)
  const categoryChange = (val, templates) => {
    searchbox.value = ''
    if (val === 'All') {
      showViews(templates)
      setActiveCategory('All')
      setTemplatesCount(templates.length)
      return
    } 
    else if (val === 'Health') {
      const result = templates.filter(item => item.category.find(cat => cat === 'Health'))
      setSearch(result)
      showViews(result)
      setActiveCategory('Health')
      setTemplatesCount(result.length)
      return
    } 
    else if (val === 'E-commerce') {
      const result = templates.filter(item => item.category.find(cat => cat === "E-commerce"))
      setSearch(result)
      showViews(result)
      setActiveCategory('E-commerce')
      setTemplatesCount(result.length)
      return
    } 
    else {
      const result = templates.filter(item => item.category.find(cat => cat === "Education"))
      setSearch(result)
      showViews(result)
      setActiveCategory('Education')
      setTemplatesCount(result.length)
      return
    }
  }

  //Search Templates Name by active category
  const searchItems = (e) => {
    const string = e.target.value.toLowerCase()
    let searchResult = []

    if (activeCategory === 'All') {
      searchResult.push(...templates.filter(item => item.name.toLowerCase() === string))
    } 
    else if (activeCategory === 'Health') {
      let health = templates.filter(item => item.category === "health")
      searchResult.push(...health.filter(item => item.name === string))
      setTemplatesCount(health.length)
    } 
    else if (activeCategory === 'E-commerce') {
      let ecommerce = templates.filter(item => item.category === "e-commerce")
      searchResult.push(...ecommerce.filter(item => item.name === string))
      setTemplatesCount(ecommerce.length)
    } 
    else {
      let education = templates.filter(item => item.category === "education")
      searchResult.push(...education.filter(item => item.name === string))
      setTemplatesCount(education.length)
    }
    

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
    const string = e.target.value.toLowerCase()
    setActiveCategory(string)

    let searchResult = []
    let filterResult = templates.filter(item => item.category === string)
    console.log(filterResult)
    // searchResult.push(filterResult.find(item => item.name.toLowerCase() === string))
    // setViews(searchResult)
    // setTemplatesCount(searchResult.length)
    
  }


  useEffect(() => {
    fetch('https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates')
    .then(res => res.json())
    .then(data => {
      setTemplates(data)
      setTemplatesCount(data.length)
      showViews(data) 
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
              <input className={styles.searchInput} ref={el => searchbox = el} type="text" placeholder="Search Templates" onChange={(e) => searchItems(e)}/>
              <div className={styles.searchIconDiv}>
                <img className={styles.searchIcon} src="/search.png" width="18px" height="18px" />
              </div>
            </div>

            <div className={styles.sortByDiv}>
              <p className={styles.sortby}>Sort By: </p>
              <div className={styles.fieldsetContainer}>
                <fieldset>
                  <legend>Category</legend>
                  <select name="category" onClick={(e) => categoryChange(e.target.value, templates)}>
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
              <p className={styles.pagination} onClick={() => prevPage(search, n)}>&lt; Previous</p>
              <p><span className={styles.currentPage}>{page}</span> of {(templatesCount / 15).toFixed(0)}</p>
              <p className={styles.pagination} onClick={() => nextPage(search, n)}>Next &gt;</p>
            </div>
            }
        
      </main>

    </div>
  )
}