import React from 'react'
import styled from 'styled-components'

const FooterElement = styled.footer`
    background-color: #9d9d9d10;
    color: #19181996;
    text-align: center;
    font-size: 13px;
    padding: 10px 0;
    position: absolute; /* ou 'static' */
    bottom: 0px;
    left:0;
    width: 100%;

    a{
        color: #19181996;
    }
`
const Footer = () => {
    return (
        <FooterElement>
            Criado por <a target='_blank' href='http://google.com'>Samuel Davi</a>
        </FooterElement>
    )
}

export default Footer