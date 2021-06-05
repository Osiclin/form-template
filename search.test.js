const categoryChange = require('./search')

const templates = [{
    name: 'gringo',
    category: ['health', 'e-commerce', 'education'],
    status: 'active'
},
{
    name: 'united',
    category: ['health', 'e-commerce'],
    status: 'active'
},
{
    name: 'blues',
    category: ['e-commerce', 'education'],
    status: 'inactive'
},
{
    name: 'city',
    category: ['health', 'education'],
    status: 'inactive'
}]

const activeCategory = 'E-commerce'

test('test', () => {
    expect(categoryChange(activeCategory, templates)).toEqual([{
        name: 'gringo',
        category: ['health', 'e-commerce', 'education'],
        status: 'active'
    },
    {
        name: 'united',
        category: ['health', 'e-commerce'],
        status: 'active'
    },
    {
        name: 'blues',
        category: ['e-commerce', 'education'],
        status: 'inactive'
    }
    ])
})