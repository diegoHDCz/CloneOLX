import React from 'react'
import { Link } from 'react-router-dom'

function Page()  {
    return(
        <div>
            <h1>Pagina não encontrada</h1>

            <Link to="/">Voltar a página incial</Link>
        </div>
    )
}

export default Page;