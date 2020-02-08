import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { logic } from '../../logic/index'
import './superHero.css'
import ReactModal from 'react-modal'
import Button from '@material-ui/core/Button';
import TexField from '@material-ui/core/TextField'

const SuperHero = () => {
    const [superHero, setSuperHero] = useState('')
    const [result, setResult] = useState('')
    const [error, setError] = useState('')
    const [showModal, setShowModal] = useState(false)

    const searchHeroe = (e) => {
        e.preventDefault()
        logic.retrieveCharacterByName(superHero)
            .then(res => {
                console.log('test')
                if(res.data.count > 0) {
                    setError('')
                    setResult(res.data)
                    setSuperHero('')
                    setShowModal(true)
                }
                else {
                    setShowModal(true)
                    setResult('')
                    setError('Hero not found')
                }
            })
    }

    return(
        <div className="container-superHero">
            <h4>Search you hero</h4>
           <form onSubmit={(e) => searchHeroe(e)}>
                <TexField 
                    type="text" 
                    label="Your favourite superhero"
                    onChange={(e) => setSuperHero(e.target.value)}
                    className='container-input-superHero'
                    value={superHero}/>
                <Button 
                    type='submit'
                    color='primary'
                    variant="contained"
                    >Search!
                </Button>
            </form>
            <ReactModal 
                isOpen={showModal}
                contentLabel="Minimal Modal Example"
                className='modal'>
                <Button 
                    className='button' 
                    onClick={() => setShowModal(false)} 
                    color='primary'
                    variant="contained">
                    Close
                </Button>
                {result ? 
                    <div className="modal-item">
                        <h2>{result.results[0].name}</h2>
                        <p>{result.results[0].description}</p>
                        <img src={`${result.results[0].thumbnail.path}.${result.results[0].thumbnail.extension}`}/>
                    </div>
                    : <p>{error}</p>
                }
            </ReactModal>
        </div>
    )
}

export default withRouter(SuperHero)