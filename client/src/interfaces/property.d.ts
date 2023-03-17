import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    propertyType: string,
    location: string,
    price: number | undefined,
}

export interface ContentCardProps {
  id?: BaseKey | undefined,
  title: string,
  contentCategory: string,
}

export interface ContentCard2Props {
  id?: BaseKey | undefined,
  title: string,
  paragraphTitle: string,
  paragraph: string,
}
