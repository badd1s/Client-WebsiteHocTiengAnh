import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    //Forum Data
    const [post, setPost] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchResultByAdmin, setSearchResultByAdmin] = useState([]);
    const { data: dataForum, fetchError: fetchErrorForum, isLoading: isLoadingForum } = useAxiosFetch('/homePost');

    useEffect(() => {
        dataForum &&
            setPost(dataForum);
    }, [dataForum])

    useEffect(() => {
        const filterResults = post.filter(val => {
            const body = val.body ? val.body.toLowerCase() : '';
            const title = val.title ? val.title.toLowerCase() : '';
            return body.includes(search.toLowerCase()) || title.includes(search.toLowerCase());
        });

        setSearchResult(filterResults.reverse());
    }, [post, search])

    useEffect(() => {
        const filterResults = post.filter(val => {
            const authorId = val.authorId ? val.authorId.toLowerCase() : '';
            const title = val.title ? val.title.toLowerCase() : '';
            return authorId.includes(search.toLowerCase()) || title.includes(search.toLowerCase());
        });

        setSearchResultByAdmin(filterResults.reverse());
    }, [post, search])

    // List Grammar Data
    const [listGram, setListGram] = useState([]);
    const [searchGramResult, setSearchGramResult] = useState([]);
    const { data: dataListGram, fetchError: fetchErrorListGram, isLoading: isLoadingListGram } = useAxiosFetch('/listGrammar');

    useEffect(() => {
        dataListGram &&
            setListGram(dataListGram);
    }, [dataListGram])

    useEffect(() => {
        const filterResults = listGram.filter(val => {
            const collectionName = val.collectionName ? val.collectionName.toLowerCase() : '';
            const title = val.title ? val.title.toLowerCase() : '';
            return collectionName.includes(search.toLowerCase()) || title.includes(search.toLowerCase());
        });

        setSearchGramResult(filterResults.reverse());
    }, [listGram, search])

    // List Vocabulary Data
    const [listVocab, setListVocab] = useState([]);
    const [searchVocabResult, setSearchVocabResult] = useState([]);
    const { data: dataListVocab, fetchError: fetchErrorListVocab, isLoading: isLoadingListVocab } = useAxiosFetch('/listVocabulary');

    useEffect(() => {
        dataListVocab &&
            setListVocab(dataListVocab);
    }, [dataListVocab])

    useEffect(() => {
        const filterResults = listVocab.filter(val => {
            const collectionName = val.collectionName ? val.collectionName.toLowerCase() : '';
            const title = val.title ? val.title.toLowerCase() : '';
            return collectionName.includes(search.toLowerCase()) || title.includes(search.toLowerCase());
        });

        setSearchVocabResult(filterResults.reverse());
    }, [listVocab, search])

    // List Practice Gram
    const [listPracGram, setListPracGram] = useState([]);
    const [searchPracGramResult, setSearchPracGramResult] = useState([]);
    const { data: dataListPracGram, fetchError: fetchErrorListPracGram, isLoading: isLoadingListPracGram } = useAxiosFetch('/listPracticeGrammar');

    useEffect(() => {
        dataListPracGram &&
            setListPracGram(dataListPracGram);
    }, [dataListPracGram])

    useEffect(() => {
        const filterResults = listPracGram.filter(val => {
            const body = val.body ? val.body.toLowerCase() : '';
            const title = val.title ? val.title.toLowerCase() : '';
            const collectionName = val.collectionName ? val.collectionName.toLowerCase() : '';
            return body.includes(search.toLowerCase()) || title.includes(search.toLowerCase()) || collectionName.includes(search.toLowerCase());
        });

        setSearchPracGramResult(filterResults.reverse());
    }, [listPracGram, search])

    return (
        <DataContext.Provider value={{
            search, setSearch, searchResult,
            fetchErrorForum, isLoadingForum, setPost, post,
            fetchErrorListGram, isLoadingListGram, setListGram, listGram,
            fetchErrorListVocab, isLoadingListVocab, setListVocab, listVocab,
            fetchErrorListPracGram, isLoadingListPracGram, setListPracGram, listPracGram,
            searchGramResult, searchVocabResult, searchPracGramResult, searchResultByAdmin
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;