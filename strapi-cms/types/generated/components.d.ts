import type { Schema, Struct } from '@strapi/strapi';

export interface SharedDeveloperInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_developer_infos';
  info: {
    description: 'Developer company information';
    displayName: 'Developer Info';
    icon: 'briefcase';
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Fakhruddin Properties'>;
    reraNumber: Schema.Attribute.String & Schema.Attribute.Required;
    telephone: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedDropdownOption extends Struct.ComponentSchema {
  collectionName: 'components_shared_dropdown_options';
  info: {
    description: 'Generic dropdown option for forms';
    displayName: 'Dropdown Option';
    icon: 'arrowDown';
  };
  attributes: {
    isDefault: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedEoiStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_eoi_steps';
  info: {
    description: 'Individual EOI process step';
    displayName: 'EOI Step';
    icon: 'check';
  };
  attributes: {
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    step: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedFormSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_form_sections';
  info: {
    description: 'Form section configuration';
    displayName: 'Form Section';
    icon: 'layer';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['user', 'building', 'dollar', 'users', 'briefcase', 'file']
    > &
      Schema.Attribute.DefaultTo<'user'>;
    isOptional: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSalesManager extends Struct.ComponentSchema {
  collectionName: 'components_shared_sales_managers';
  info: {
    description: 'Sales manager for assignment';
    displayName: 'Sales Manager';
    icon: 'user';
  };
  attributes: {
    email: Schema.Attribute.Email;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    description: 'Statistics display item with value and label';
    displayName: 'Stat Item';
    icon: 'chartPie';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedUnitItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_unit_items';
  info: {
    description: 'Property unit type with details';
    displayName: 'Unit Item';
    icon: 'building';
  };
  attributes: {
    count: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    price: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Price To Be Announced'>;
    size: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.developer-info': SharedDeveloperInfo;
      'shared.dropdown-option': SharedDropdownOption;
      'shared.eoi-step': SharedEoiStep;
      'shared.form-section': SharedFormSection;
      'shared.sales-manager': SharedSalesManager;
      'shared.stat-item': SharedStatItem;
      'shared.unit-item': SharedUnitItem;
    }
  }
}
