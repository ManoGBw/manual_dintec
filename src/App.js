import React, { useState } from "react";
import "./styles.css";
//Importa o JSON
import data from "./conteudo.json";

//imagens com legendas do carrosel
function ImageWithCaption({ placeholderText, caption, imageNumber }) {
  return (
    <div className="image-container">
      <img src={placeholderText} alt={caption} className="tutorial-image" />
      <div className="caption-box">
        <span>{caption}</span>
        <span>Imagem {imageNumber} de 1</span>
      </div>
    </div>
  );
}

//Caixa de Nota - usar pra alertas fica em laranja
function NoteBox({ children }) {
  return (
    <div className="note-box">
      <strong>Nota:</strong> {children}
    </div>
  );
}



//Resumo Lateral
function SummarySidebar({ steps, currentStep, setCurrentStep, activeNote }) {
  return (
    <aside className="summary-sidebar">
      <h3>Resumo da Rotina</h3>

      <ul className="summary-steps">
        {steps.map((step, index) => (
          <li
            key={index}
            className={index === currentStep ? "active" : ""}
            onClick={() => setCurrentStep(index)}
          >
            <span>{step.title}</span>
          </li>
        ))}
      </ul>
      <div className="summary-note-container">
        {activeNote && <NoteBox>{activeNote}</NoteBox>}
      </div>
    </aside>
  );
}

//Conteúdo Principal 
function MainContent({ activeTopic }) {
  const [currentStep, setCurrentStep] = useState(0);
//buscar rotinas ativas no JSON
  const rotinaAtiva = data.manualDintec.boletos[activeTopic];

  const handleNext = () => {
    if (rotinaAtiva && currentStep < rotinaAtiva.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Reseta o passo ao mudar de tópico
  React.useEffect(() => {
    setCurrentStep(0);
  }, [activeTopic]);

  const renderTopicContent = (topic) => {
    // Se a rotina não for encontrada no JSON, exibe um padrão
    if (!rotinaAtiva) {
      return (
        <>
          <h1>{topic.replace(/-/g, " ")}</h1>
          <p>
            Conteúdo para <strong>{topic}</strong> ainda não implementado.
          </p>
        </>
      );
    }

    // Pega o passo atual da rotina ativa
    const step = rotinaAtiva.steps[currentStep];

    return (
      <>
        <h1>{rotinaAtiva.title}</h1>
        <p>{rotinaAtiva.description}</p>

        <div className="carousel-container">
          <h2>📖 {step.title}</h2>
          {step.content.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}

          {step.image && (
            <ImageWithCaption
              placeholderText={step.image}
              caption={step.caption}
              imageNumber={currentStep + 1}
            />
          )}
        </div>

        <div className="summary-nav">
          <button onClick={handlePrev} disabled={currentStep === 0}>
            &larr; Anterior
          </button>
          <span>
            Passo {currentStep + 1} de {rotinaAtiva.steps.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentStep === rotinaAtiva.steps.length - 1}
          >
            Próximo &rarr;
          </button>
        </div>

      </>
    );
  };

  return (
    <main className="main-content">
      <div className="content-wrapper">
        <div className="content-panel">{renderTopicContent(activeTopic)}</div>

        {rotinaAtiva && rotinaAtiva.steps.length > 1 && (
          <SummarySidebar
            steps={rotinaAtiva.steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            activeNote={rotinaAtiva.steps[currentStep].note}
          />
        )}
      </div>
    </main>
  );
}

//Barra Lateral
function Sidebar({ activeTopic, setActiveTopic }) {
  const [isBoletoOpen, setIsBoletoOpen] = useState(true);

  const handleNavClick = (topic) => {
    setActiveTopic(topic);
  };

  const handleParentClick = (e, topic) => {
    e.preventDefault();
    setIsBoletoOpen(!isBoletoOpen);
    if (!isBoletoOpen) {
      setActiveTopic("introducao");
    }
  };

  const isActive = (topic) => (activeTopic === topic ? "active" : "");

  return (
//lista de topicos do menu
    <aside className="sidebar">
      <h2>Menu de Ajuda</h2>
      
      <nav>
        <ul>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("cadastros")}
              className={isActive("cadastros")}
            >
              Cadastros
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("notas-fiscais")}
              className={isActive("notas-fiscais")}
            >
              Notas Fiscais
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("pedido-venda")}
              className={isActive("pedido-venda")}
            >
              Pedido de Venda
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("caixa")}
              className={isActive("caixa")}
            >
              Caixa
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("relatorios")}
              className={isActive("relatorios")}
            >
              Relatórios e Gráficos
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("contas-pagar")}
              className={isActive("contas-pagar")}
            >
              Contas a Pagar
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("contas-receber")}
              className={isActive("contas-receber")}
            >
              Contas a Receber
            </a>
          </li>

          <li className="has-submenu">
            <a
              href="#"
              onClick={(e) => handleParentClick(e, "boletos")}
              className={`submenu-trigger ${isBoletoOpen ? "open" : ""}`}
            >
              Boletos
              <span className="arrow">{isBoletoOpen ? "▼" : "▶"}</span>
            </a>
            {isBoletoOpen && (
              <ul className="submenu">
                <li>
                  <a
                    href="#"
                    onClick={() => handleNavClick("introducao")}
                    className={isActive("introducao")}
                  >
                    Requisitos para uso de Boletos no Sistema
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleNavClick("gerar-venda")}
                    className={isActive("gerar-venda")}
                  >
                    Gerar Boleto pela Venda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleNavClick("gerar-nfe")}
                    className={isActive("gerar-nfe")}
                  >
                    Gerar Boleto pela NFe
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleNavClick("recuperacao")}
                    className={isActive("recuperacao")}
                  >
                    Recuperação de Geração
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}

//Componente Principal da Aplicação
export default function App() {
  const [activeTopic, setActiveTopic] = useState("gerar-venda");

  return (
    <div className="app-container">
      <Sidebar activeTopic={activeTopic} setActiveTopic={setActiveTopic} />
      <MainContent activeTopic={activeTopic} />
    </div>
  );
}
