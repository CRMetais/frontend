import React, { useState, useEffect } from "react"; 
import "../styles/ListagemDeColaboradoresStyle.css";
import { colors } from "@mui/material";
import CadastroClienteContainer from "./CadastroCliente";
import { listarClientes } from "../services/clienteService";


const ListagemClientes = () => {
  const [listaClientes, setListaClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await listarClientes();
        setListaClientes(dados);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        alert("Erro ao conectar com o servidor!");
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);


  if (loading) return <p>Carregando clientes...</p>;

  return (
    <div className="container">
      <ClienteHeader />
      {listaClientes.map((cliente) => (
        <ClienteItem 
          key={cliente.id} 
          cliente={cliente} 
          onClick={setClienteSelecionado} 
        />
      ))}

      {clienteSelecionado && (
        <ClienteModal 
          cliente={clienteSelecionado} 
          onClose={() => setClienteSelecionado(null)} 
        />
      )}
    </div>
  );
};


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
const ListaClientes = () => { 
  const [listaClientes, setListaClientes] = useState([]); 
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await listarClientes();
        setListaClientes(Array.isArray(dados) ? dados : []);
      } catch (error) {
        console.error("Erro ao carregar clientes", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  if (loading) return <div style={{padding: "20px"}}>Carregando clientes do banco...</div>;

  return (
    <div className="lista-colaboradores-container">
      <div className="lista-colaboradores-grid">
        <ClienteHeader />
        
        {listaClientes.length > 0 ? (
          listaClientes.map((cliente) => (
            <ClienteItem 
              key={cliente.id} 
              cliente={cliente}
              onClick={setClienteSelecionado}
            />
          ))
        ) : (
          <p style={{padding: "20px"}}>Nenhum cliente encontrado no banco de dados.</p>
        )}
      </div>
      
      {clienteSelecionado && (
        <ClienteModal 
          cliente={clienteSelecionado} 
          onClose={() => setClienteSelecionado(null)} 
        />
      )}
    </div>
  );
};

export default ListaClientes;
