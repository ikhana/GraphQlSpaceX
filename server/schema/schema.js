// Load the full build.
var _ = require('lodash');

// Load the core build.

/*var books =[
  {name:'Name of the wind', genre:'fantasy', id:'1',authorId:'1'},
  {name:'Name of the Empire', genre:'fantasy', id:'2',authorId:'2'},
  {name:'Name of the Scifi', genre:'Sci-Fi', id:'3',authorId:'3'},
  {name:'Name of the jogarh', genre:'fantasy', id:'1',authorId:'1'},
  {name:'Name of the jadoo', genre:'fantasy', id:'2',authorId:'2'},
  {name:'Name of the shazoo', genre:'Sci-Fi', id:'3',authorId:'3'}
]*/
/*var authors =[
  {name:'Inaam', age:'22', id:'1'},
  {name:'Faraaz', age:'23', id:'2'},
  {name:'Usman', age:'24', id:'3'}
]*/

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLID, 
  GraphQLNonNull
} = require('graphql');

const Book=require ('./dbmodels/book');
const Author =require ('./dbmodels/author');
// Launch Type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  
    author:{
      type: AuthorType,
      resolve(parent,args){
        //return _.find(authors,{id:parent.authorId});
        return Author.findById(parent.authorId);
      }
    }
   
  })
});
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return _.filter(books,{authorId:parent.id});
        return Book.find({authorId:parent.id})
      }
    }
    
  })
});


// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id:{type:GraphQLID}},
      resolve(parent, args) {
       //return  _.find(books,{id:args.id})
        //return axios
          //.get('https://api.spacexdata.com/v3/launches')
          //.then(res => res.data);
          return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {id:{type:GraphQLID}},
      resolve(parent, args) {
       //return  _.find(authors,{id:args.id})
        //return axios
          //.get('https://api.spacexdata.com/v3/launches')
          //.then(res => res.data);
          return Author.findById(args.id)
      }
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return books
        return Book.find({});
      }

    },
    authors:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return authors
        return Author.find({});
      }

    }

   /* launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get('https://api.spacexdata.com/v3/rockets')
          .then(res => res.data);
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then(res => res.data);
      }
    }*/
  }

});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    addAuthor: {
      type: AuthorType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString) },
        age: {type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent,args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook:{
      type: BookType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString) },
        genre: {type: new GraphQLNonNull(GraphQLString) },
        authorId: {type:new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});