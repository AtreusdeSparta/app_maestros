import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerStudent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Student, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly LastName?: string | null;
  readonly MaternalName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStudent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Student, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly LastName?: string | null;
  readonly MaternalName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Student = LazyLoading extends LazyLoadingDisabled ? EagerStudent : LazyStudent

export declare const Student: (new (init: ModelInit<Student>) => Student) & {
  copyOf(source: Student, mutator: (draft: MutableModel<Student>) => MutableModel<Student> | void): Student;
}