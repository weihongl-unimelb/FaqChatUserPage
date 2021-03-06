import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Col, Card, Row, Container } from 'react-bootstrap';

const API = 'https://ocapi20200225090922.azurewebsites.net/faq/';

class QuestionDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            questionItem:{},
            topics: [],
        }
    }

    componentDidMount() {
        const QUERY = 'questions/' + this.props.match.params.id;
        fetch(API + QUERY)
          .then(response => response.json())
          .then(data => this.setState({questionItem: data}));

        fetch(API + 'questionTopics')
        .then(response => response.json())
        .then(data => this.setState({topics: data}));
    }

    render(){

        const topics = this.state.topics.map((topic)=>{
            return(
                <Link to={`/TopicDetail/${topic.id}/${topic.name}`}><Card.Header><img src={topic.icon.url} align="left" />{ topic.name }</Card.Header></Link>
            ) 
        });

        console.log(this.state.questionItem);
        return(
            <div className="questionDetails">
                <Container>
                    <Row>
                        <Col xs={12} md={7}>
                        <h1>{this.state.questionItem.description}</h1>
                        <div dangerouslySetInnerHTML={{__html:this.state.questionItem.content}} className="questionContent"></div>
                        <div dangerouslySetInnerHTML={{__html:this.state.questionItem.answer}} className="questionAnswer"></div>
                        <div dangerouslySetInnerHTML={{__html:this.state.questionItem.updateTime}} className="questionUpdateTime"></div>
                        </Col>

                    
                        <Col md={{ span: 4, offset: 1 }}>
                            <Card style={{ width: '18rem' }}>
                            <ListGroup variant="flush">
                                {topics}
                            </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                
                
            </div>
        );
    }
}

export default QuestionDetail;