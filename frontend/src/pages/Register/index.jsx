import React, { useState } from 'react'
import './styles.css'

import api from '../../services/api'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export default function Register() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [whatsapp, setWhatsapp] = useState()
    const [city, setCity] = useState()
    const [uf, setUF] = useState()

    const history = useHistory()
    
    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name, email, whatsapp, city, uf
        }
        console.table(data)
        try {
            const response = await api.post('ongs', data)
            alert(`Seu ID de acesso: ${response.data.id}`)
            return history.push('/')

        } catch (error) {
            console.log(error)
            alert("Ops... Ocorreu um erro.")
        }

    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plattaforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="e02041" />
                        Já tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} id="name" placeholder="Nome da ONG" />
                    <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} id="email" placeholder="E-mail" />
                    <input type="text" name="whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} id="whatsapp" placeholder="WhatsApp" />

                    <div className="input-group">
                        <input type="text" name="city" value={city} onChange={e => setCity(e.target.value)} id="city" placeholder="City" />
                        <input type="text" name="uf" value={uf} onChange={e => setUF(e.target.value)} id="uf" placeholder="UF" style={{ width: 80 }} />
                    </div>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}