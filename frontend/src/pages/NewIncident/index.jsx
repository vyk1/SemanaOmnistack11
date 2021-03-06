import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'
import { useState } from 'react'

export default function NewIncident() {
    const [title, setTitle] = useState('')
    const ongId = localStorage.getItem('ongId')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const history = useHistory()

    async function handleNewIncident(e) {
        e.preventDefault()
        const data = {
            title, description, value
        }
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            alert('Caso cadastrado!')
            return history.push('/profile')

        } catch (error) {
            console.log(error);
            alert("Ops... Ocorreu um erro.")
        }

    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1> Cadastrar Novo Caso </h1>
                    <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
            Voltar para Home
          </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Titulo do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit"> Cadastrar </button>
                </form>
            </div>
        </div>
    )
}