import React from 'react';
import fetch from 'node-fetch';
import { Card, Image, Icon } from 'semantic-ui-react';

class CardItem extends React.Component {
    
    static async getInitialProps({query}) {
        const cardId = query.id;
        const res = await fetch(`https://api.scryfall.com/cards/${cardId}`);
        const statusCode = res.status;
        const card = await res.json();

        return {
            card,
            statusCode,
        };
    }

    render() {

        const {card} = this.props;

        return (
            <Card style={{ margin: '0 auto'}}>
                <Image src={card.image_uris.art_crop} />
                <Card.Content>
                    <Card.Header>{card.name}</Card.Header>
                    <Card.Meta>
                        <Icon name="theme" />
                        {card.mana_cost}
                    </Card.Meta>
                    <Card.Description>
                        {card.oracle_text.split('\n').map((paragraph, index) => 
                        <p key={index}>{paragraph}</p>)}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                {card.set_name}
                </Card.Content>
            </Card>
        );
    }
}

export default CardItem;