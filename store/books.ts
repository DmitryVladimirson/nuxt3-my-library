import {defineStore} from 'pinia'

export enum BtnType {
    LINK = 'link',
    BTN = 'button',
    NUXT_LINK = 'nuxt-link'
}

export interface Book {
    id: string,
    title: string,
    price: number | string,
    imgUrl: string,
    shortDescr: string,
    infoLink: string,
    favourites: boolean
}


export const useBooksStore = defineStore({
    id: 'books-store',
    state: () => {
        return {
            books: <Book[]>[],
            savedBooks: <String[]>[],
            isLoading: false,
            apiKey: 'AIzaSyCVoHfoXQW2687ikGIs8w1UJpm1MO7xLgk',
        }
    },
    actions: {
        //loading the list of books on query
        async loadBooks(query: string) {

            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${this.apiKey}`)

            if (response.ok) {
                const result = await response.json()
                if (result.items) {

                    this.books = this.books.filter(book => book.favourites === true)
                    result.items.forEach(item => {
                        const existingBook = this.books.find(book => book.id === item.id)
                        if (!existingBook) {
                            let data = this.constructBookData(item)
                            this.books.unshift(data)
                        }
                    })
                } else {
                    this.books = this.books.filter(book => book.favourites === true)

                    throw new Error('Not Found')
                }

            }
        },

        //loading saved books from cookies
        async loadSavedBooks() {
            const localSavedBooks = JSON.parse(localStorage.getItem("savedBooks"));
            if (localSavedBooks) {
                this.savedBooks = localSavedBooks
            }
            let response, result
            for (const savedBook of this.savedBooks) {
                const existingBook = this.books.find(book => book.id === savedBook)
                if (!existingBook) {
                    response = await fetch(`https://www.googleapis.com/books/v1/volumes/${savedBook}?key=${this.apiKey}`)
                    if (response.ok) {
                        result = await response.json()
                        if (!this.books.find(book => book.id === result.id)) {
                            let data = this.constructBookData(result)
                            data.favourites = true
                            this.books.push(data)
                        }
                    }
                } else {
                    existingBook.favourites = true
                }
            }

        },
        //returns a new book object
        constructBookData(result): Book {
            return {
                id: result.id,
                title: String(result.volumeInfo.title),
                imgUrl: result.volumeInfo.imageLinks && result.volumeInfo.imageLinks.thumbnail,
                shortDescr: result.volumeInfo.description,
                price: result.saleInfo.saleability === "FOR_SALE" ? Math.floor(result.saleInfo.retailPrice.amount) : result.saleInfo.saleability.split('_').join(' '),
                infoLink: result.volumeInfo.infoLink,
                favourites: false
            }

        },

        //handling loading (needed for loading spinner to show)
        async handleLoading(callback) {
            this.isLoading = true
            try {
                await callback()
            } catch (err) {
                throw err
            } finally {
                this.isLoading = false
            }

        },

        //toggle favourite status of a book card
        toggleFavourite(bookId: string) {
            const book = this.books.find(book => book.id === bookId)
            book.favourites = !book.favourites
            if (book.favourites && !this.savedBooks.find(book => book === bookId)) {
                this.savedBooks.push(book.id)
            } else {
                this.savedBooks.splice(this.savedBooks.findIndex(book => book === bookId), 1)
            }

            localStorage.setItem("savedBooks", JSON.stringify(this.savedBooks));

        }
    },
    getters: {
        //returns a list of books
        getBooks(state):Book[] {
            return state.books
        },

        //returns a list of saved books
        getSavedBooks(state): Book[] {
            if (state.books) {
                return state.books.filter(book => book.favourites === true)
            }
        },

        //returns loading status
        getLoading(state) {
            return state.isLoading
        }
    },
})