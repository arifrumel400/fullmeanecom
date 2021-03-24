class APIFeatures {
    constructor(query, queryStr){
        this.query = query; 
        this.queryStr = queryStr;
    }
 // http://localhost:4000/products?keyword=one&category=Laptops 

    search(){
        const keyword =this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        console.log(keyword)

        this.query = this.query.find({...keyword})

        return this;
    }
    filter() {

        const queryCopy = {...this.queryStr}

        console.log(queryCopy)

        //Removing fields from query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el])

        console.log(queryCopy)

       // this.query = this.query.find(queryCopy)

        let queryStr = JSON.stringify(queryCopy)
        console.log(queryStr)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match =>`$${match}`)

        console.log(queryStr)

        this.query = this.query.find(JSON.parse(queryStr))

        return this;
    }
}

module.exports = APIFeatures 