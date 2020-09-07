import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'https://nails-australia-staging.herokuapp.com',
    commodities: [
      {
        'Cuticle nippers': [
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$15'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          }
        ],
        'Nail nippers': [
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          }
        ],
        'Cuticle scissors': [
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$15'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          }
        ],
        'Nail scissors': [
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$15'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          }
        ]
      },
      {
        Pushers: [
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$15'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          }
        ],
        'Pedicure tools': [
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$15'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          }
        ],
        'Diamond Drill bits': [
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$15'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          }
        ],
        'Carbide Drill bits': [
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$15'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          }
        ]
      },
      {
        Brushes: [
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$15'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          }
        ],
        Tweezers: [
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$15'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          }
        ],
        Cosmetics: [
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$15'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          }
        ],
        'Expendable materials': [
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$15'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            description: 'Diamond Drill bits',
            name: 'Diamond Drill bits long flame 2.3b',
            price: '$4.5'
          }
        ]
      },
      {
        Promotions: [
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/sports',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$12'
          },
          {
            img: 'http://lorempixel.com/200/160/animals',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$15'
          },
          {
            img: 'http://lorempixel.com/200/160/transport',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$10'
          },
          {
            img: 'http://lorempixel.com/200/160/people',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7'
          },
          {
            img: 'http://lorempixel.com/200/160/abstract',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$9'
          },
          {
            img: 'http://lorempixel.com/200/160/city',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$8'
          },
          {
            img: 'http://lorempixel.com/200/160/nature',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$4'
          },
          {
            img: 'http://lorempixel.com/200/160/cats',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$3.5'
          },
          {
            img: 'http://lorempixel.com/200/160/fashion',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$5.5'
          },
          {
            img: 'http://lorempixel.com/200/160/technics',
            name: 'Diamond Drill bits long flame 2.3b',
            description: 'Diamond Drill bits',
            price: '$7.5'
          },
          {
            img: 'http://lorempixel.com/200/160/food',
            description: 'Diamond Drill bits',
            name: 'Diamond Drill bits long flame 2.3b',
            price: '$4.5'
          }
        ]
      }
    ],
    buttonForDetailOfflineShop: 'Apply',
    buttonForRegistrationOfflineShop: 'CONFIRM DETAILS AND PROCEED WITH PAYMENT',
    buttonForRegistrationOnlineShop: 'BUY THIS COURSE',
    viewportWidth: window.innerWidth
  },
  modules,
  getters: {
    //
  },
  mutations: {
    CHANGE_VIEWPORT_WIDTH: (state) => { state.viewportWidth = window.innerWidth }
  },
  actions: {
    //
  }
})
