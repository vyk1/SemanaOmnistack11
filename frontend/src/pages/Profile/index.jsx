import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import { useState } from 'react'

export default function Profile() {
  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')
  const [incidents, setIncidents] = useState([])
  const history = useHistory()

  // vazio exec 1x apenas
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(res => {
      setIncidents(res.data)
    })
  }, [ongId])

  async function handleDeleteIncident(id) {
    try {
      await api.delete('incidents/' + id, {
        headers: {
          Authorization: ongId
        }
      })

      alert('Caso deletado!')
      return setIncidents(incidents.filter(incident => incident.id !== id))

    } catch (error) {
      console.log(error);
      alert("Ops... Ocorreu um erro.")
    }
  }
  async function handleLogout() {
    await localStorage.clear()
    return history.push('/')

  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span> Bem-vinda {ongName} </span>

        <Link className="button" to="/incidents/new"> Cadastrar novo caso </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="e02041" />
        </button>
      </header>
      <h1> Casos Cadastrados </h1>

      <ul>
        {/* parenteses para retornar componente */}
        {/* chaves para colocar return */}
        {!incidents.length && (
          <p>Eba! Não há casos!</p>
        )}
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong> CASO: </strong>
            <p> {incident.title} </p>

            <strong> DESCRIÇÃO: </strong>
            <p> {incident.description} </p>

            <strong> VALOR: </strong>
            <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)} </p>

            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}