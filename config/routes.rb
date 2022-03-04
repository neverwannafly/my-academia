Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "home#index"

  namespace :api do
    resources :registrations, only: %i[create]
    resources :sessions, only: %i[create destroy]
    resources :health_check, only: %i[index]

    resources :classroom do
      get '/quote', action: 'quote'
      get '/search', action: 'search'
      post '/like', action: 'handle_like'

      resources :stats, only: %i[index]
      resources :activities, only: %i[index]

      resources :resources, only: %i[index create destroy update] do
        post '/mark_completed', action: 'mark_completed'
      end

      nested do
        scope '/:commentable_type/:commentable_id' do
          resources :comments, only: %i[index create destroy update]
        end
      end
    end
  end

  get "*any" => "home#index"
end
