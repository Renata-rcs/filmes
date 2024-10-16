'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovies";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Col, Row } from "react-bootstrap";
import styles from './Page.module.css'; // Importa o CSS para estilização

export default function Page() {
  const [filmes, setFilmes] = useState([])
  const [series, setSeries] = useState([])
  const [atores, setAtores] = useState([])

  useEffect(() => {
    apiMovie.get('movie/popular').then(resultado => {
      let imagens = resultado.data.results.map(item => ({
        original: 'https://image.tmdb.org/t/p/w500' + item.backdrop_path,
        thumbnail: 'https://image.tmdb.org/t/p/w200' + item.backdrop_path,
        originalTitle: item.title,
      }))
      setFilmes(imagens)
    })

    apiMovie.get('tv/popular').then(resultado => {
      let imagens = resultado.data.results.map(item => ({
        original: 'https://image.tmdb.org/t/p/w500' + item.backdrop_path,
        thumbnail: 'https://image.tmdb.org/t/p/w200' + item.backdrop_path,
        originalTitle: item.name,
      }))
      setSeries(imagens)
    })

    apiMovie.get('person/popular').then(resultado => {
      let imagens = resultado.data.results.map(item => ({
        original: 'https://image.tmdb.org/t/p/w500' + item.profile_path,
        thumbnail: 'https://image.tmdb.org/t/p/w200' + item.profile_path,
        originalTitle: item.name,
      }))
      setAtores(imagens)
    })
  }, [])

  return (
    <Pagina titulo="The Movie">

      <Row className="my-5">
        <Col md={6} className={styles.textCol}>
          <h2>Filmes</h2>
          <p>
            Mergulhe em uma jornada visual pelos filmes que têm capturado a imaginação do público. Este é o seu bilhete para o mundo das grandes histórias e cinematografia impressionante. Aqui, você encontrará uma coleção de filmes que estão dominando as telas e deixando uma marca indelével na cultura pop.
          </p>
          <p>
            Prepare-se para se perder em narrativas emocionantes e em visuais de tirar o fôlego que definem os favoritos do momento. A aventura começa agora!
          </p>
        </Col>
        <Col md={6} className={styles.carouselCol}>
          {filmes.length && <ReactImageGallery items={filmes} />}
        </Col>
      </Row>

      <Row className="my-5">
        <Col md={6} className={styles.carouselCol}>
          {series.length && <ReactImageGallery items={series} />}
        </Col>
        <Col md={6} className={styles.textCol}>
        <h2>Séries</h2>
          <p>
            Entre no universo das séries que estão no topo das paradas e que têm conquistado corações e mentes ao redor do mundo. Este carrossel oferece uma visão geral das narrativas mais envolventes e dos personagens mais memoráveis da atualidade.
          </p>
          <p>
            Prepare-se para explorar mundos novos e emocionantes, onde cada episódio promete uma nova aventura. É a sua chance de acompanhar as histórias que estão moldando a TV moderna.
          </p>
        </Col>
      </Row>

      <Row className="my-5">
        <Col md={6} className={styles.textCol}>
          <h2>Atores Populares</h2>
          <p>
            Conheça as estrelas que estão brilhando no cenário global. Estes são os talentos que estão transformando a indústria do entretenimento com suas performances cativantes e carismáticas. São as pessoas que trazem a magia para as telas e cativam audiências com cada papel que interpretam.
          </p>
          <p>
            Explore as personalidades que estão fazendo ondas e deixando uma impressão duradoura no público e na crítica. É hora de conhecer os nomes que são sinônimo de talento e sucesso na indústria do cinema e da televisão.
          </p>
        </Col>
        <Col md={6} className={styles.carouselCol}>
          {atores.length && <ReactImageGallery items={atores} />}
        </Col>
      </Row>

    </Pagina>
  )
}
