import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>);
}

function RenderComments({ comments, addComment, campsiteId }) {
    return comments ?
        <div className="col-md-5 m-1">
            <h4>Comments</h4>
            {comments.map((comment) => {
                return (
                    <p>
                        {comment.text}<br />
                             --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                    </p>
                )
            }
            )}
            <CommentForm campsiteId={campsiteId} addComment={addComment} />
        </div>
        : <div ><CommentForm campsiteId={campsiteId} addComment={addComment} /></div>

}
function CampsiteInfo(props) {
    return props.campsite ? (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>
            <div className="row" >
                <RenderCampsite campsite={props.campsite} />
                <RenderComments
                    comments={props.comments}
                    addComment={props.addComment}
                    campsiteId={props.campsite.id}
                />
            </div>
        </div>
    ) : (<div />);
}

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            author: '',
            text: '',
            rating: '1',
            touched: {
                author: false,
                text: false,
                rating: false
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleSubmit(values) {
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        this.toggleModal();
    }


    render() {
        return (
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <label htmlFor="rating">Rating</label>
                                <Control.select
                                    name="rating"
                                    model=".rating"
                                    className="form-control custom-select"
                                    id="rating" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="rating">Your Name</label>
                                <Control.text
                                    name="author"
                                    model=".author"
                                    className="form-control"
                                    id="author"
                                    placeholder="Your Name"

                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}

                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Control.textarea
                                    name="text"
                                    model=".text"
                                    className="form-control"
                                    id="text"
                                    rows="6" />
                            </div>

                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}><i class="fa fa-pencil fa-lg" aria-hidden="true"></i>Submit Comment</Button>
            </div>
        );
    }
}

export default CampsiteInfo;