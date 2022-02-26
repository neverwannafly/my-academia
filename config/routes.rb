Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "home#index"

  namespace :api do
    resources :registrations, only: %i[create]
    resources :sessions, only: %i[create destroy]
    resources :health_check, only: %i[index]

    resources :classroom do
      get '/quote', action: 'quote'

      resources :resources, only: %i[index create destroy update] do
        resources :comments, only: %i[index create destroy update]
      end
    end
  end

  get "*any" => "home#index"
end
