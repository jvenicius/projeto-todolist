import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InfoIcon from '@mui/icons-material/Info';

export default function Footer() {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const TextoModal = styled.p`
    color: black;
    font-size: 1.2rem;
    text-align: justify;
  `;

  const FooterBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  `;

  const Text = styled.p`
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 5px;
    color: #000;
  `;

  return (
    <>
    <FooterBox>
      <Text>
        Desenvolvido por{" "}
        <Link
          href="https://www.instagram.com/jvinny_santos"
          color="inherit"
          underline="hover"
          target="_blank"
        >
          Venícius
        </Link>
      </Text>
      <InfoIcon sx={{fontSize: "2rem", cursor: "pointer"}} onClick={handleClickOpenModal}/>
    </FooterBox>
    <Dialog
        fullScreen={fullScreen}
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">ATUALIZAÇÃO</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextoModal>
              Olá, sou o desenvolvedor Venícius, o projeto de lista de tarefas
              acaba de ter uma atualização. Alguns bugs foram corrigidos e temos
              um novo visual. Contudo, preciso avisar o projeto para por aqui.
              Mas calma, irei desenvolver um aplicativo de celular com mais
              funções e novidades, quando estiver pronto passarei aqui para te
              avisar.
            </TextoModal>
            <TextoModal>
              {" "}
              🤗 Obrigado por usar esta aplicação, agradecimento especial ao meu
              amigo, Tiago ADM do IFE.
            </TextoModal>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModal} variant="contained">
            OK!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
