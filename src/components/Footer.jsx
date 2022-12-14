import React from 'react'
import styled from "styled-components";
import { Link } from '@mui/material';

export default function Footer() {
    const FooterBox = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 100px;
        padding: 1rem 0;
    `

    const Text = styled.p`
        font-size: 2rem;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 5px;
        color: #fff;
    `

    return (
        <FooterBox>
            <Text>Desenvolvido por <Link href='https://www.instagram.com/dev.jvinny' color='inherit' underline='hover' target='_blank'>@dev.jvinny</Link></Text>
        </FooterBox>
    )

}