import React from 'react';
import Router from 'next/router';
import { Segment, Container, Header, Form, Button, Icon } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchRandomCards} from '../app/actions/cardActions';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchPhrase: '',
            selectedFormat: 'standard',
        };

        this.formats = [
            {key: 'standard', text: 'Standard', value: 'standard' },
            {key: 'modern', text: 'Modern', value: 'modern' },
            {key: 'commander', text: 'Commander', value: 'commander' },
            {key: 'legacy', text: 'Legacy', value: 'legacy' },
            {key: 'vintage', text: 'Vintage', value: 'vintage' },
        ];

        this.handleSearchPhraseChange = this.handleSearchPhraseChange.bind(this);
        this.redirectToSearchPage = this.redirectToSearchPage.bind(this);
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.findRandomCard = this.findRandomCard.bind(this);
    }

    handleSearchPhraseChange(event) {
        this.setState({
            searchPhrase: event.target.value,
        });
    }

    redirectToSearchPage() {
        Router.push({
            pathname: '/search',
            query: { q: this.state.searchPhrase, f: this.state.selectedFormat},
        });
    }

    handleFormatChange(event, control) {
        this.setState({
            selectedFormat: control.value,
        })
    }

    async findRandomCard() {
        const res = await fetch(`https://api.scryfall.com/cards/random`);
        const data = await res.json();

        Router.push({
            pathname: '/card',
            query: {id: data.id}
        });
    }

    render() {
        return (
            <Segment
            textAlign="center"
            style={{ minHeight: '100vh', marginTop: '200px' }}
            vertical
            >
                <Container text>
                    <Header content="DevColllege Combo Card Search" />
                    <Form>
                        <Form.Group>
                            <Form.Input label="Search for cards" value={this.state.searchPhrase}
                            onChange={this.handleSearchPhraseChange} />
                            <Form.Select label="Format" width={4} value={this.state.selectedFormat}
                            onChange={this.handleFormatChange} options={this.formats} />
                        </Form.Group>
                        <Button onClick={this.redirectToSearchPage}>
                            Submit
                            <Icon name="right arrow" />
                        </Button>
                        <Button onClick={this.findRandomCard}>
                            <Icon name="random" />
                        </Button>
                    </Form>    
                </Container>
            </Segment>
        );
    }
}

const mapStatToProps = state => ({
    cards: state.cards,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRandomCards,
}, dispatch);

export default connect(mapStatToProps, mapDispatchToProps)(Home);