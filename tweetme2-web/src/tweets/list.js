import React, { useEffect, useState } from 'react'
import { apiTweetList } from './lookup'
import { Tweet } from './detail'

export function TweetsList(props) {
    //~~~~~~ STATE
    const [tweetsInit, setTweetsInit] = useState([]) //init tweet
    const [tweets, setTweets] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
    const [isTweetsDidSet, setTweetsDidSet] = useState(false)
    useEffect(() => {
        const final = [...props.newTweets].concat(tweetsInit)
        if (final.length !== tweets.length) {
            setTweets(final) //final tweet
        }
    }, [props.newTweets, tweets, tweetsInit])

    useEffect(() => {
        if (!isTweetsDidSet) {
            const handleTweetListLookup = (response, status) => {
                if (status === 200) {
                    setNextUrl(response.next)
                    setTweetsInit(response.results) //init tweet
                    setTweetsDidSet(true)
                } else {
                    alert("There was an error")
                }
            }
            //nếu ko có "isTweetsDidSet" thì sẽ là vòng lặp vô hạn apiTweetList(handleTweetListLookup) dẫn đến gọi API từ Django vô hạn > console python nhảy liên tục!!!
            apiTweetList(props.username, handleTweetListLookup) //call API giống Axios: "http://localhost:8000/api/tweets/"
        }
    }, [tweetsInit, isTweetsDidSet, setTweetsDidSet, props.username])
    const handleDidRetweet = (newTweet) => {
        const updateTweetsInit = [...tweetsInit]
        updateTweetsInit.unshift(newTweet)
        setTweetsInit(updateTweetsInit)
        const updateFinalTweets = [...tweets]
        updateFinalTweets.unshift(tweets)
        setTweets(updateFinalTweets)
    }
    const handleLoadNext = (event) => {
        event.preventDefault()
        if (nextUrl !== null) {
            const handleLoadNextResponse = (response, status) => {
                if (status === 200) {
                    setNextUrl(response.next)
                    const newTweets = [...tweets].concat(response.results)
                    setTweetsInit(newTweets)
                    setTweets(newTweets)
                } else {
                    alert("There was an error")
                }
            }
            apiTweetList(props.username, handleLoadNextResponse, nextUrl)
        }
    }

    return <React.Fragment>
        {
            tweets.map((item, index) => {
                return <Tweet
                    tweet={item}
                    didRetweet={handleDidRetweet}
                    className='my-5 py-5 border bg-white text-dark'
                    key={`${index}-{item.id}`} />
            })
        }
        {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>Load next</button>}
    </React.Fragment>
}