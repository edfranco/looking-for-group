import { useState, useEffect } from 'react'
import axios from 'axios'

interface Game {
    id: number | string
    name: string
    src: string
}

export const Carousel = () => {
    const [gamesArr, setGamesArr] = useState<Game[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await axios.get('http://localhost:3000/')
                setGamesArr(res.data)
                setLoading(false) // Set loading to false once data is fetched
            } catch (err) {
                setError('Failed to fetch games')
                setLoading(false)
            }
        }
        fetchGames()
    }, [])

    if (loading) return <p>Loading games...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="landing-carousel w-full mb-36 box-border overflow-hidden">
            <div className="top-carousel w-max flex my-16 animate-scroll">
                {gamesArr.slice(0, gamesArr.length / 2).map((game) => (
                    <img
                        key={game.id}
                        src={game.src}
                        alt={game.name}
                        className="carousel-slide h-auto w-96 bg-shades-white mx-2"
                    />
                ))}
                {gamesArr.slice(0, gamesArr.length / 2).map((game) => (
                    <img
                        key={game.id}
                        src={game.src}
                        alt={game.name}
                        className="carousel-slide h-auto w-96 bg-shades-white mx-2"
                    />
                ))}
            </div>
            <div className="bottom-carousel w-max flex my-16 animate-scroll-reverse">
                {gamesArr.slice(gamesArr.length / 2).map((game) => (
                    <img
                        key={game.id}
                        src={game.src}
                        alt={game.name}
                        className="carousel-slide h-auto w-96 bg-shades-white mx-2"
                    />
                ))}
                {gamesArr.slice(gamesArr.length / 2).map((game) => (
                    <img
                        key={game.id}
                        src={game.src}
                        alt={game.name}
                        className="carousel-slide h-auto w-96 bg-shades-white mx-2"
                    />
                ))}
            </div>
        </div>
    )
}
