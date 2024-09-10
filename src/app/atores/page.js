'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import { Button, Card, Col, Row } from "react-bootstrap";
import Link from "next/link";

export default function Page() {

    const [atores, setAtores] = useState([])

    useEffect(() => {
        apiMovie.get('person/popular').then(resultado => {
            setAtores(resultado.data.results)
        })
    }, [])

    return (
        <Pagina titulo="Atores">

            <Row md={4}>
                {atores.map(item => (
                    <Col key={item.id} className="mt-3">
                        <Card>
                            <Card.Img height={250} variant="top" src={'https://image.tmdb.org/t/p/w500/' + item.profile_path} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Link className="btn btn-danger" href={`/atores/${item.id}`}>
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

