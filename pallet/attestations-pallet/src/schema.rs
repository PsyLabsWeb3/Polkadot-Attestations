use codec::{Encode, Decode};
use scale_info::TypeInfo;
use serde::{Serialize, Deserialize};
use sp_runtime::AccountId32;

#[derive(Encode, Decode, TypeInfo, Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct Schema {
    pub id: u32,
    pub name: String,
    pub version: u32,
    pub fields: Vec<SchemaField>,
}

#[derive(Encode, Decode, TypeInfo, Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct SchemaField {
    pub name: String,
    pub data_type: String,
    pub value: String,
}

#[derive(Encode, Decode, TypeInfo, Serialize, Deserialize, Debug, Clone, PartialEq, Eq)]
pub struct Attestation {
    pub id: u32,
    pub schema_id: u32,
    pub subject: AccountId32,
    pub issuer: AccountId32,
    pub data: Vec<SchemaField>,
}