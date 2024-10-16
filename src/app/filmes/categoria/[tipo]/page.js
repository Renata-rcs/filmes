'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Button, Card, Col, Row } from "react-bootstrap";
import Link from "next/link";

export default function Page({params}) {

    const [filmes, setFilmes] = useState([])
    const [titulo, setTitulo] = useState([])

    useEffect(() => {
        const tipo = params.tipo 
        apiMovie.get(`movie/${params.tipo}`).then(resultado => {
            setFilmes(resultado.data.results)


            let tituloAtual;
            switch (tipo) {
                case 'popular':
                    tituloAtual = 'Filmes Populares';
                    break;
                case 'now_playing':
                    tituloAtual = 'Filmes em Cartaz';
                    break;
                case 'upcoming':
                    tituloAtual = 'Filmes em Breve';
                    break;
                case 'top_rated':
                    tituloAtual = 'Filmes Mais Bem Avaliadas';
                    break;
                default:
                    tituloAtual = 'Filmes';
            }

            setTitulo(tituloAtual);
        })
    }, [])

    return (
        <Pagina titulo={titulo}>

            <Row md={3}>
                {filmes.map(item => (
                    <Col key={item.id} className="mt-3">
                        <Card>
                            <Card.Img height={150} variant="top" src={'https://image.tmdb.org/t/p/w500/' + item.backdrop_path} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.original_title}</Card.Text>
                                <Card.Text>Popularidade: {item.popularity}</Card.Text>
                                <Link className="btn btn-danger" href={`/filmes/${item.id}`}>
                                    Detalhes
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}

