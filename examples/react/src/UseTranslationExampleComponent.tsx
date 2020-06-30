import React, { Component } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

class UseTranslationExampleComponent extends Component<WithTranslation> {
    render() {
        const { t } = this.props as any;
  
        return (
            <div>
                <p>With withTranslation HOC:</p>
                <h3>{t('intro')}</h3>
            </div>
        );
    }
}

export default withTranslation()(UseTranslationExampleComponent);
