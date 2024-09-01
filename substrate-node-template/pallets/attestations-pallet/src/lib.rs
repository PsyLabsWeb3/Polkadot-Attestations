#![cfg_attr(not(feature = "std"), no_std)]

pub mod schema;

//use frame_system::pallet;
pub use pallet::*;

#[frame_support::pallet(dev_mode)]
pub mod pallet {
    use frame_support::{pallet_prelude::*, Blake2_128Concat};
    use frame_system::pallet_prelude::*;
    use crate::schema::{Schema, Attestation}; 

    #[pallet::pallet]
    pub struct Pallet<T>(_);

    /*
    pub enum Event<T: Config> {
        // Define your events here
    }
    */

    #[pallet::config]
    pub trait Config: frame_system::Config {
        //type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
    }

    #[pallet::storage]
    #[pallet::getter(fn schema)]
    pub type Schemas<T: Config> = StorageMap<_, Blake2_128Concat, u32, Schema, OptionQuery>;

    #[pallet::storage]
    #[pallet::getter(fn attestation)]
    pub type Attestations<T: Config> = StorageMap<_, Blake2_128Concat, u32, Attestation, OptionQuery>;

    #[pallet::call]
    impl<T: Config> Pallet<T> {
        
        #[pallet::weight(10_000)]
        pub fn insert_schema(origin: OriginFor<T>, key: u32, schema: Schema) -> DispatchResult {
            let who = ensure_signed(origin)?;

            // Insert or update the schema in the storage map
            Schemas::<T>::insert(key, schema);

            Ok(())
        }

        #[pallet::weight(10_000)]
        pub fn get_schema(origin: OriginFor<T>, key: u32) -> DispatchResult {
            let who = ensure_signed(origin)?;

            // Retrieve the schema from the storage map
            if let Some(schema) = Schemas::<T>::get(key) {
                // schema found
            } else {
                // schema not found
            }

            Ok(())
        }

        #[pallet::weight(10_000)]
        pub fn insert_attestation(origin: OriginFor<T>, key: u32, attestation: Attestation) -> DispatchResult {
            let who = ensure_signed(origin)?;

            // Insert or update the attestation in the storage map
            Attestations::<T>::insert(key, attestation);

            Ok(())
        }

        #[pallet::weight(10_000)]
        pub fn get_attestation(origin: OriginFor<T>, key: u32) -> DispatchResult {
            let who = ensure_signed(origin)?;

            // Retrieve the attestation from the storage map
            if let Some(attestation) = Attestations::<T>::get(key) {
                // attestation found
            } else {
                // attestation not found
            }

            Ok(())
        }
    }
}