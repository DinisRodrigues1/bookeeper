import React, { Component, Fragment } from 'react'
import './Results.scss'
import { connect } from 'react-redux'
import Pagination from "react-js-pagination"
import { Pagination as Page } from "reactstrap"
import { Link } from 'react-router-dom'
import { Media, Button } from 'reactstrap'


const itemsPerPage = 5


class Results extends Component {
    constructor (props) {
        super(props)
        this.state = {
            activePage: 1,
            author_name: ''
        };

             
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`)
        this.setState({
            activePage: pageNumber
        });
    }

    handleAdd = (e) => {
        
    
        console.log('data added')
        
       /* this.setState({
            author_name: mapdata.title.author_name
            
        }) 
        console.log(this.state.author_name)*/
    }

    render(){
        const { auth } = this.props
        var arr = Object.values(this.props.search)
        window.localStorage.setItem('show', JSON.stringify(arr))
        let storage = window.localStorage.getItem('show')
        let usage = JSON.parse(storage)
        console.log(storage)
        const indexOfLastThing = this.state.activePage * itemsPerPage;
        const indexOfFirstThing = indexOfLastThing - itemsPerPage;
        // For page 1, you will get things.slice(0, 5).
        // For page 2, you will get things.slice(5, 10).
        const itemsShown = usage[0].slice(
          indexOfFirstThing,
          indexOfLastThing
        );
        
        var mapdata

        return(
            <Fragment> 
                <h1>Results:</h1>
                    {this.props.search ? 
                      mapdata = itemsShown.map((title) => (
                        <div className="d-xl-flex">
                            <Media className="mt-1 flex-row justify-content-around">
                                <div className="d-flex justify-content-center">
                                    <Media left middle href="" className="cover">
                                    {title.isbn[0] ? 
                                        <Media object src={`http://covers.openlibrary.org/b/isbn/${title.isbn[0]}-M.jpg`} alt={title.title} className="size"/>
                                        : title.isbn[1]}
                                    </Media>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Media body className="info text-center">
                                        <Media heading>
                                            Autor: {title.author_name}
                                        </Media>
                                            <p>Título: {title.title}</p>
                                            {title.publisher[1] ? <p>Editora: {title.publisher[0] +", " + title.publisher[1] + ", entre outras."}</p> : <p>Editora: {title.publisher[0]}</p>}
                                    </Media> 
                                </div>
                                <div className="d-flex justify-content-center">
                                        <Button color="primary" onClick={this.handleAdd} className="">
                                            + info
                                        </Button><br/>
                                        {auth.isEmpty ? <Link to='/login'><Button color="primary" onClick={this.handleAdd} className="">
                                            Adicionar
                                        </Button></Link> : <Button color="primary" onClick={this.handleAdd} className="">
                                            Adicionar
                                        </Button>}
                                        
                                </div>
                            </Media>
                        </div>     
                         )) : `Erro de pesquisa`}
                        <Page>
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={arr[0].length}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)}
                                />
                        </Page>
              </Fragment>
        )}
}

//this.props.search.value.data
const mapStateToProps = (state) => {
    return {
        search: state.search,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Results)