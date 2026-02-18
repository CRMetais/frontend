import React, { useState } from "react";
import "../styles/ListagemDeColaboradoresStyle.css";
import { colors } from "@mui/material";
import CadastroClienteContainer from "./CadastroCliente";

const clientes = [
  { 
    id: 1, 
    nome: "Carlos Almeida", 
    reponsavel: "carlosAlmeida@gmail.com", 
    tabela: "Alta",
    apelido: "Carlão",
    telefone: "(11) 99888-0984",
    email: "carlosAlmeida@gmail.com",
    cpfCnpj: "543.654.654.78",
    ie: "?",
    rg: "-",
    tipoPessoa: "F",
    cidade: "São Paulo",
    estado: "SP",
    bairro: "Jaraguá",
    rua: "Estrada de Taipas",
    numero: "458",
    cep: "02448-888",
    responsavelConta: "Thiago Cardoso",
    documento: "587.485.458-88",
    chavePix: "(11) 99854-8547",
    tipoConta: "-",
    conta: "-",
    agencia: "-",
    banco: "-",
    tabelaPreco: "Padrão",
    gestor: "Ricardo",
    tabelaSemanal: "Sim",
    ultimaVenda: "02/09/2025",
    status: "Ativo",
    statusCadastro: "OK",
    rendimento: "R$850,25"
  },
  { id: 2, nome: "Cláudio Filho", reponsavel: "claudioFilho@gmail.com", tabela: "Alta" },
  { id: 3, nome: "João Vitor", reponsavel: "joaoVitor@gmail.com", tabela: "Alta" },
  { id: 4, nome: "Wellington Souza", reponsavel: "wellSouza@gmail.com", tabela: "Alta" },
  { id: 5, nome: "Alexandre Silva", reponsavel: "alexandreSilva@gmail.com", tabela: "Alta" },
  { id: 6, nome: "Bruno Miranda", reponsavel: "brunoMiranda@gmail.com", tabela: "Alta" },
  { id: 7, nome: "Ronaldo Ferraz", reponsavel: "ronaldoFerraz@gmail.com", tabela: "Alta" },
  { id: 8, nome: "Jairo Torres", reponsavel: "jairoTorres@gmail.com", tabela: "Alta" },
  { id: 9, nome: "Floriano Silveira", reponsavel: "florianoSilveira@gmail.com", tabela: "Alta" },
  { id: 10, nome: "Luis Fernando", reponsavel: "luisFernando@gmail.com", tabela: "Alta" },
  { id: 11, nome: "Paulo Muniz", reponsavel: "pauloMuniz@gmail.com", tabela: "Alta" },
  { id: 12, nome: "Jorge Pereira", reponsavel: "jorgePereira@gmail.com", tabela: "Alta" },
  { id: 13, nome: "Luis Fernando", reponsavel: "luisFernando@gmail.com", tabela: "Alta" },
];

const ClienteModal = ({ cliente, onClose }) => {
  if (!cliente) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button onClick={onClose} className="modal-close">×</button>

        <h1 className="modal-title">{cliente.nome}</h1>

        <div className="modal-grid">
          
          <div className="modal-section">
            <h3 className="modal-section-title">Informações</h3>
            
            <div className="modal-fields">
              <p className="modal-field">
                <strong>Apelido:</strong> {cliente.apelido || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Telefone:</strong> {cliente.telefone || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>E-mail:</strong> {cliente.email || cliente.reponsavel}
              </p>
              <p className="modal-field modal-field-border">
                <strong>CPF/CNPJ:</strong> {cliente.cpfCnpj || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>IE:</strong> {cliente.ie || '?'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>RG:</strong> {cliente.rg || '-'}
              </p>
              <p className="modal-field">
                <strong>Tipo Pessoa:</strong> {cliente.tipoPessoa || 'F'}
              </p>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Endereço</h3>
            
            <div className="modal-fields">
              <p className="modal-field modal-field-border">
                <strong>Cidade:</strong> {cliente.cidade || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Estado:</strong> {cliente.estado || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Bairro:</strong> {cliente.bairro || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Rua:</strong> {cliente.rua || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Número:</strong> {cliente.numero || '-'}
              </p>
              <p className="modal-field">
                <strong>CEP:</strong> {cliente.cep || '-'}
              </p>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Conta Bancária</h3>
            
            <div className="modal-fields">
              <p className="modal-field modal-field-border">
                <strong>Responsável:</strong> {cliente.responsavelConta || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Documento:</strong> {cliente.documento || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Chave Pix:</strong> {cliente.chavePix || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Tipo Conta:</strong> {cliente.tipoConta || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Conta:</strong> {cliente.conta || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Agência:</strong> {cliente.agencia || '-'}
              </p>
              <p className="modal-field">
                <strong>Banco:</strong> {cliente.banco || '-'}
              </p>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Tabela de preço</h3>
            
            <div className="modal-fields">
              <p className="modal-field modal-field-border">
                <strong>Tabela:</strong> {cliente.tabelaPreco || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Gestor:</strong> {cliente.gestor || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Tabela semanal:</strong> {cliente.tabelaSemanal || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Última venda:</strong> {cliente.ultimaVenda || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Status:</strong> {cliente.status || '-'}
              </p>
              <p className="modal-field modal-field-border">
                <strong>Status Cadastro:</strong> {cliente.statusCadastro || '-'}
              </p>
              <p className="modal-field">
                <strong>Rendimento:</strong> {cliente.rendimento || '-'}
              </p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn-editar">Editar</button>
        </div>
      </div>
    </div>
  );
};

const ClienteHeader = () => {
  return (
    <div className="colaborador-header">
      <span className="colaborador-id">ID</span>
      <span className="colaborador-nome">Nome</span>
      <span className="colaborador-email">E-mail</span>
      <span className="colaborador-email">Tabela</span>
    </div>
  );
};

const ClienteItem = ({ cliente, onClick }) => {
  return (
    <div className="colaborador-line" onClick={() => onClick(cliente)}>
      <div className="colaborador-item">
        <span className="colaborador-id">{cliente.id}</span>
        <span className="colaborador-nome">{cliente.nome}</span>
        <span className="colaborador-email">{cliente.reponsavel}</span>
        <span className="colaborador-email">{cliente.tabela}</span>
      </div>
      <div className="divisao"></div>
    </div>
  );
};

const ListaClientes = ({ lista = clientes }) => {
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  return (
    <div className="lista-colaboradores-container">
      {/* <br /> */}

      <div className="lista-colaboradores-grid">
        <ClienteHeader />
        {lista.map((cliente) => (
          <ClienteItem 
            key={cliente.id} 
            cliente={cliente}
            onClick={setClienteSelecionado}
          />
        ))}
      </div>

      <CadastroClienteContainer></CadastroClienteContainer>

      <ClienteModal 
        cliente={clienteSelecionado}
        onClose={() => setClienteSelecionado(null)}
        
      />

    </div>
  );
};

export default ListaClientes;