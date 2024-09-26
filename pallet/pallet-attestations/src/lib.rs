//! # Attestations Pallet
//!
//! A pallet with attestations functionality to help developers integrate attestations to their projects.

// We make sure this pallet uses `no_std` for compiling to Wasm.
#![cfg_attr(not(feature = "std"), no_std)]

pub mod schema;

// Re-export pallet items so that they can be accessed from the crate namespace.
pub use pallet::*;

// FRAME pallets require their own "mock runtimes" to be able to run unit tests. This module
// contains a mock runtime specific for testing this pallet's functionality.
#[cfg(test)]
mod mock;

// This module contains the unit tests for this pallet.
// Learn about pallet unit testing here: https://docs.substrate.io/test/unit-testing/
#[cfg(test)]
mod tests;

// Every callable function or "dispatchable" a pallet exposes must have weight values that correctly
// estimate a dispatchable's execution time. The benchmarking module is used to calculate weights
// for each dispatchable and generates this pallet's weight.rs file. Learn more about benchmarking here: https://docs.substrate.io/test/benchmark/
#[cfg(feature = "runtime-benchmarks")]
mod benchmarking;
pub mod weights;
pub use weights::*;

// All pallet logic is defined in its own module and must be annotated by the `pallet` attribute.
#[frame_support::pallet]
pub mod pallet {
	// Import various useful types required by all FRAME pallets.
	use super::*;
	use frame_support::pallet_prelude::*;
	use frame_system::pallet_prelude::*;
	use crate::schema::{Schema, Attestation}; 

	// The `Pallet` struct serves as a placeholder to implement traits, methods and dispatchables
	// (`Call`s) in this pallet.
	#[pallet::pallet]
	#[pallet::without_storage_info]
	pub struct Pallet<T>(_);

	/// The pallet's configuration trait.
	///
	/// All our types and constants a pallet depends on must be declared here.
	/// These types are defined generically and made concrete when the pallet is declared in the
	/// `runtime/src/lib.rs` file of your chain.
	#[pallet::config]
	pub trait Config: frame_system::Config {
		/// The overarching runtime event type.
		type RuntimeEvent: From<Event<Self>> + IsType<<Self as frame_system::Config>::RuntimeEvent>;
		/// A type representing the weights required by the dispatchables of this pallet.
		type WeightInfo: WeightInfo;
	}

	/// Storage items for this pallet.
	///
	/// In this pallet, we are declaring two storage items called `Scehmas` and `Attestations`
	/// to store the corresponding data, and two counters for unique ID management.

	#[pallet::storage]
    #[pallet::getter(fn schema)]
    pub type Schemas<T: Config> = StorageMap<_, Blake2_128Concat, u32, Schema>;

    #[pallet::storage]
    #[pallet::getter(fn attestation)]
	pub type Attestations<T: Config> = StorageMap<_, Blake2_128Concat, u32, Attestation>;

	#[pallet::storage]
	#[pallet::getter(fn next_schema_id)]
	pub type NextSchemaId<T> = StorageValue<_, u32, ValueQuery>;

	#[pallet::storage]
	#[pallet::getter(fn next_attestation_id)]
	pub type NextAttestationId<T> = StorageValue<_, u32, ValueQuery>;

	/// Events that functions in this pallet can emit.
	///
	/// Events are a simple means of indicating to the outside world (such as dApps, chain explorers
	/// or other users) that some notable update in the runtime has occurred. In a FRAME pallet, the
	/// documentation for each event field and its parameters is added to a node's metadata so it
	/// can be used by external interfaces or tools.
	///
	///	The `generate_deposit` macro generates a function on `Pallet` called `deposit_event` which
	/// will convert the event type of your pallet into `RuntimeEvent` (declared in the pallet's
	/// [`Config`] trait) and deposit it using [`frame_system::Pallet::deposit_event`].
	#[pallet::event]
	pub enum Event<T: Config> {
		
	}

	/// Errors that can be returned by this pallet.
	///
	/// Errors tell users that something went wrong so it's important that their naming is
	/// informative. Similar to events, error documentation is added to a node's metadata so it's
	/// equally important that they have helpful documentation associated with them.
	///
	/// This type of runtime error can be up to 4 bytes in size should you want to return additional
	/// information.
	#[pallet::error]
	pub enum Error<T> {
		/// There was an attempt to insert an attestation with an invalid schema id.
		SchemaNotFound,
	}

	/// The pallet's dispatchable functions ([`Call`]s).
	#[pallet::call]
	impl<T: Config> Pallet<T> {
		#[pallet::call_index(0)]
		#[pallet::weight(T::WeightInfo::insert_schema())]
        pub fn insert_schema(origin: OriginFor<T>, schema: Schema) -> DispatchResult {
            let _who = ensure_signed(origin)?;

			// Check if the counter is already initialized, if not set it to 1
			if NextSchemaId::<T>::get() == 0 {
				NextSchemaId::<T>::put(1);
			}

			// Get the next unique schema ID
			let schema_id = NextSchemaId::<T>::get();

			// Update the schema with the new ID
			let mut new_schema = schema;
			new_schema.id = schema_id;

            // Insert or update the schema in the storage map
            Schemas::<T>::insert(schema_id, new_schema);

			// Increment the ID for the next schema
			NextSchemaId::<T>::put(schema_id + 1);

            Ok(())
        }

		#[pallet::call_index(1)]
        #[pallet::weight(T::WeightInfo::get_schema())]
        pub fn get_schema(origin: OriginFor<T>, schema_id: u32) -> DispatchResult {
            let _who = ensure_signed(origin)?;

            // Retrieve the schema from the storage map
            if let Some(_schema) = Schemas::<T>::get(schema_id) {
                // schemas found
            } else {
                // schemas not found
            }

            Ok(())
        }

		#[pallet::call_index(2)]
        #[pallet::weight(T::WeightInfo::insert_attestation())]
        pub fn insert_attestation(origin: OriginFor<T>, attestation: Attestation) -> DispatchResult {
            let _who = ensure_signed(origin)?;

			// Check if the counter is already initialized, if not set it to 1
			if NextAttestationId::<T>::get() == 0 {
				NextAttestationId::<T>::put(1);
			}

			// Validate that the schemaID exists in the Schemas storage
			ensure!(
				Schemas::<T>::contains_key(attestation.schema_id),
				Error::<T>::SchemaNotFound
			);

			// Get the next unique attestation ID
			let attestation_id = NextAttestationId::<T>::get();

			// Update the attestation with the new ID
			let mut new_attestation = attestation;
			new_attestation.id = attestation_id;

            // Insert the attestation in the storage map
            Attestations::<T>::insert(attestation_id, new_attestation);

			// Increment the ID for the next attestation
			NextAttestationId::<T>::put(attestation_id + 1);

            Ok(())
        }

		#[pallet::call_index(3)]
        #[pallet::weight(T::WeightInfo::get_attestation())]
        pub fn get_attestation(origin: OriginFor<T>, attestation_id: u32) -> DispatchResult {
            let _who = ensure_signed(origin)?;

            // Retrieve the attestation from the storage map
            if let Some(_attestation) = Attestations::<T>::get(attestation_id) {
                // attestations found
            } else {
                // attestations not found
            }

            Ok(())
        }
	}
}
